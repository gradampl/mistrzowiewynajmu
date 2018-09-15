using MistrzowieWynajmu.Models.Database;
using MistrzowieWynajmu.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MistrzowieWynajmu.Models.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly DatabaseContext _databaseContext;

        public AddressRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int AddAddress(Address address)
        {
            if (address == null)
            {
                throw new Exception("Address object cannot be null.");
            }

            _databaseContext.Addresses.Add(address);
            _databaseContext.SaveChanges();
            return address.AddressId;
        }

        public Address GetAddress(int addressId)
        {
            if (addressId <= 0)
            {
                throw new Exception("AddressId object cannot be less than or equal zero.");
            }

            return _databaseContext.Addresses.FirstOrDefault(address => address.AddressId == addressId);
        }

        public List<Address> GetAll()
        {
            return _databaseContext.Addresses.ToList();
        }

        public int UpdateAddress(Address address)
        {
            if (address == null)
            {
                throw new Exception("The address object cannot be null.");
            }

            _databaseContext.Addresses.Update(address);
            _databaseContext.SaveChanges();
            return address.AddressId;
        }
    }
}
