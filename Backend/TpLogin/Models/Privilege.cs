using System;
using System.Collections.Generic;

#nullable disable

namespace TpLogin.Models
{
    public partial class Privilege
    {
        public Privilege()
        {
            UserPriviliges = new HashSet<UserPrivilige>();
        }

        public int Id { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UserPrivilige> UserPriviliges { get; set; }
    }
}
