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
            if (await _userRepository.EmailExistsAsync(dto.Email))
            {
                throw new Exception("El email ya está registrado");
            }

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

            var token = _jwtHelper.GenerateToken(createdUser);
            var expiresAt = _jwtHelper.GetTokenExpiration();

            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto  // ← CAMBIAR: Devolver objeto User
                {
                    UserId = createdUser.UserId,
                    FullName = $"{createdUser.FirstName} {createdUser.LastName}",  // ← COMBINAR
                    Email = createdUser.Email,
                    Role = createdUser.Role,
                    PhoneNumber = createdUser.Phone,
                    IsActive = createdUser.IsActive,
                    CreatedAt = createdUser.CreatedAt
                },
                ExpiresAt = expiresAt
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null)
            {
                throw new Exception("Email o contraseña incorrectos");
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                throw new Exception("Email o contraseña incorrectos");
            }

            if (!user.IsActive)
            {
                throw new Exception("Usuario inactivo");
            }

            var token = _jwtHelper.GenerateToken(user);
            var expiresAt = _jwtHelper.GetTokenExpiration();

            return new AuthResponseDto
            {
                Token = token,
                User = new UserDto  // ← CAMBIAR: Devolver objeto User
                {
                    UserId = user.UserId,
                    FullName = $"{user.FirstName} {user.LastName}",  // ← COMBINAR
                    Email = user.Email,
                    Role = user.Role,
                    PhoneNumber = user.Phone,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt
                },
                ExpiresAt = expiresAt
            };
        }
    }
}