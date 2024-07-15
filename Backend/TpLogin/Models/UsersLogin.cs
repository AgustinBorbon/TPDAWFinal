using System;
using System.Collections.Generic;

#nullable disable

namespace TpLogin.Models
{
    public partial class UsersLogin
    {
        public UsersLogin()
        {
            RefreshTokens = new HashSet<RefreshToken>();
            UserPriviliges = new HashSet<UserPrivilige>();
        }

        public int Id { get; set; }
        public string Salt { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }

        public virtual ICollection<RefreshToken> RefreshTokens { get; set; }
        public virtual ICollection<UserPrivilige> UserPriviliges { get; set; }
    }
}
