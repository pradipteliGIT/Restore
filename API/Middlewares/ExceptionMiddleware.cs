using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        public RequestDelegate _next;
        public ILogger<ExceptionMiddleware> _logger;
        public IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env) {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context) {
            try
            {
                await _next(context);
            }
            catch (Exception  ex)
            {
                _logger.LogError(ex, ex.Message);
                //We need to define content type and status code here for response as we are not in the scope of API controller to return these properties
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = 500;

                //Creatig response
                var response = new ProblemDetails
                {
                    Status = 500,
                    Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                    Title = ex.Message,
                };

                //This option to return response in Camel case by default 
                //Here we are not in API controller scope so have to convert it using this option
                var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                //Writting response in json format
                var json = JsonSerializer.Serialize(response, option);

                await context.Response.WriteAsync(json);

            }
        
        }

        
    }
}
