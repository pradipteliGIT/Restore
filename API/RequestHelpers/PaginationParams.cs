namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxpageSize = 50;
        public int PageNumber { get; set; }

        private int _pageSize= 6;
        public int PageSize { get=>_pageSize; set=>_pageSize = value >MaxpageSize?MaxpageSize:value; }
    }
}
