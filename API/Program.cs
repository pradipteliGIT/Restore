using API.Data;
using API.Middlewares;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

//Adding exception middleware
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:5173");
});
//Commenting this as for locally not using https redirection
//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//Creating databse
//1) Create scope
var scope = app.Services.CreateScope();
//2) Getting scope of StoreContext
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
//3) Getting scope of logger service for type of Program class
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
//4) Add databse and seed data
try
{   //This will execute if database does not exists othewise skips 
    context.Database.Migrate();
    //Add products to databse
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{

    logger.LogError(ex, "A problem occured during migration");
}

app.Run();
