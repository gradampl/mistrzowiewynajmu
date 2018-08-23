using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MistrzowieWynajmu.Models;
using MistrzowieWynajmu.Models.Interfaces;

namespace MistrzowieWynajmu.Controllers
{
    [Produces("application/json")]
    [Route("api/Property")]
    public class PropertyController : Controller
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly IOwnerRepository _ownerRepository;
        
        public PropertyController(IPropertyRepository propertyRepository, IAddressRepository addressRepository,IOwnerRepository ownerRepository)
        {
            _propertyRepository = propertyRepository;
            _addressRepository = addressRepository;
            _ownerRepository = ownerRepository;
        }

        [HttpGet("[action]")]
        public IActionResult GetProperties()
        {
            return new JsonResult(_propertyRepository.GetAllProperties());
        }

        [HttpPost("[action]")]
        public IActionResult AddProperty([FromBody] Property property)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var owner = _ownerRepository.GetOwner(property.OwnerId);
            if(owner == null)
            {
                return NotFound("Cannot find an owner with the provided Id.");
            }

            var address = _addressRepository.GetAddress(property.AddressId);
            if(address==null)
            {
                return NotFound("Cannot find an address with the provided Id.");
            }

            _propertyRepository.AddProperty(property, address, owner);
            return new JsonResult(property.Id);
        }

        [HttpGet("[action]")]
        public IActionResult GetProperty(int propertyId)
        {
            if(propertyId<=0)
            {
                return BadRequest("The Id cannot be less than or equal 0.");
            }

            return new JsonResult(_propertyRepository.GetProperty(propertyId));
        }

        [HttpPost("[action]")]
        public IActionResult UpdateProperty([FromBody] Property property)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _propertyRepository.UpdateProperty(property);
            return new JsonResult(property.Id);
        }

        [HttpGet("[action]")]
        public IActionResult DeleteProperty(int propertyId)
        {
            if (propertyId <= 0)
            {
                return BadRequest("The Id cannot be less than or equal 0.");
            }

            var property = _propertyRepository.GetProperty(propertyId);
            if(property==null)
            {
                return NotFound("Cannot find a property with the provided Id.");
            }

            var owner = _ownerRepository.GetOwner(property.OwnerId);
            if (owner == null)
            {
                return NotFound("Cannot find an owner with the provided Id.");
            }

            var address = _addressRepository.GetAddress(property.AddressId);
            if (address == null)
            {
                return NotFound("Cannot find an address with the provided Id.");
            }

            _propertyRepository.DeleteProperty(property, address, owner);
            return new JsonResult(property.Id);

        }
    }
}