using System;
using System.Collections.Generic;

#nullable disable

namespace TpLogin.Models
{
    public partial class UserPrivilige
    {
        public int Id { get; set; }
        public int UsersLoginId { get; set; }
        public int PrivilegeId { get; set; }

        public virtual Privilege Privilege { get; set; }
        public virtual UsersLogin UsersLogin { get; set; }
    }
}
