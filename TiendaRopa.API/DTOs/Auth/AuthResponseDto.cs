namespace TiendaRopa.API.DTOs.Auth
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; } = null!;  // ← CAMBIAR A OBJETO
        public DateTime ExpiresAt { get; set; }
    }
}