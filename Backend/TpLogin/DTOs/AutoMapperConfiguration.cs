using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TpLogin.Models;

namespace TpLogin.DTOs
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<UsersLogin, UsersLoginDTO>()
                    .ReverseMap();
            CreateMap<Articulo, ArticuloDTO>()
                .ReverseMap();
        }
    }
}
