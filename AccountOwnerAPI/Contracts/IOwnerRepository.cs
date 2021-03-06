﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entities.ExtendedModels;
using Entities.Models;

namespace Contracts
{
    public interface IOwnerRepository : IRepositoryBase<Owner>
    {
        Task<IEnumerable<Owner>> GetAllOwnersAsync();
        Task<Owner> GetOwnerByIdAsync(Guid ownerId);
        Task<OwnerExtended> GetOwnerWithDetailsAsync(Guid ownerId);
        Task CreateOwnerAsync(Owner owner);
        Task UpdateOwnerAsync(Owner dbOwner, Owner owner);
        Task DeleteOwnerAsync(Owner owner);
    }
}
