using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TiendaRopa.API.DTOs.Address;
using TiendaRopa.API.Interfaces;

namespace TiendaRopa.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressesController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim!);
        }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<List<AddressDto>>> GetUserAddresses()
        {
            try
            {
                var userId = GetUserId();
                var addresses = await _addressService.GetUserAddressesAsync(userId);
                return Ok(addresses);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressDto>> GetById(int id)
        {
            try
            {
                var userId = GetUserId();
                var address = await _addressService.GetByIdAsync(id, userId);

                if (address == null)
                    return NotFound(new { message = "Dirección no encontrada" });

                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST: api/Addresses
        [HttpPost]
        public async Task<ActionResult<AddressDto>> Create([FromBody] CreateAddressDto dto)
        {
            try
            {
                var userId = GetUserId();
                var address = await _addressService.CreateAsync(userId, dto);
                return CreatedAtAction(nameof(GetById), new { id = address.AddressId }, address);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/Addresses/5
        [HttpPut("{id}")]
        public async Task<ActionResult<AddressDto>> Update(int id, [FromBody] CreateAddressDto dto)
        {
            try
            {
                var userId = GetUserId();
                var address = await _addressService.UpdateAsync(id, userId, dto);
                return Ok(address);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var userId = GetUserId();
                await _addressService.DeleteAsync(id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}