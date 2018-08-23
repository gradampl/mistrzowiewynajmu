﻿using MistrzowieWynajmu.Models.Database;
using MistrzowieWynajmu.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MistrzowieWynajmu.Models.Repositories
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly DatabaseContext _databaseContext;

        public OwnerRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int AddOwner(Owner owner)
        {
            if (owner == null)
            {
                throw new Exception("Owner object cannot be null.");
            }

            _databaseContext.Owners.Add(owner);
            _databaseContext.SaveChanges();
            return owner.OwnerId;
        }

        public Owner GetOwner(int ownerId)
        {
            if (ownerId <= 0)
            {
                throw new Exception("OwnerId object cannot be less than or equal zero.");
            }

            return _databaseContext.Owners.FirstOrDefault(owner => owner.OwnerId == ownerId);
        }
    }
}
