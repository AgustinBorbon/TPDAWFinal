using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TpLogin.Models;

namespace TpLogin.DTOs
{
    public class UsersLoginDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public virtual ICollection<UserPrivilige> UserPriviliges { get; set; }

    }
}
