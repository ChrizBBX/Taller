using Taller.BusinessLogic;

namespace Taller.API.Controllers
{
    internal class ApiResponse
    {
        public string Message { get; set; }
        public ServiceResult Data { get; set; }
    }
}