using TiendaRopa.API.DTOs.Auth;
using TiendaRopa.API.Helpers;
using TiendaRopa.API.Interfaces;
using TiendaRopa.API.Models;

namespace TiendaRopa.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;

        public AuthService(IUserRepository userRepository, JwtHelper jwtHelper)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            // Verificar si el email ya existe
            if (await _userRepository.EmailExistsAsync(dto.Email))
            {
                throw new Exception("El email ya está registrado");
            }

            // Crear usuario
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Phone = dto.Phone,
                Role = "Customer",
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            var createdUser = await _userRepository.CreateAsync(user);

            // Generar token
            var token = _jwtHelper.GenerateToken(createdUser);
            var expiresAt = _jwtHelper.GetTokenExpiration();

            return new AuthResponseDto
            {
                Token = token,
                UserId = createdUser.UserId,
                Email = createdUser.Email,
                FirstName = createdUser.FirstName,
                LastName = createdUser.LastName,
                Role = createdUser.Role,
                ExpiresAt = expiresAt
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            // Buscar usuario por email
            var user = await _userRepository.GetByEmailAsync(dto.Email);

            if (user == null)
            {
                throw new Exception("Email o contraseña incorrectos");
            }

            // Verificar contraseña
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                throw new Exception("Email o contraseña incorrectos");
            }

            // Verificar si el usuario está activo
            if (!user.IsActive)
            {
                throw new Exception("Usuario inactivo");
            }

            // Generar token
            var token = _jwtHelper.GenerateToken(user);
            var expiresAt = _jwtHelper.GetTokenExpiration();

            return new AuthResponseDto
            {
                Token = token,
                UserId = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                ExpiresAt = expiresAt
            };
        }
    }
}