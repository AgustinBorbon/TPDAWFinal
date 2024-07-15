using System;
using System.Collections.Generic;

#nullable disable

namespace TpLogin.Models
{
    public partial class RefreshToken
    {
        public int Id { get; set; }
        public int UsersLoginId { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }

        public virtual UsersLogin UsersLogin { get; set; }
    }
}
