using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace TpLogin.Models
{
    public partial class LoginDBContext : DbContext
    {
        public LoginDBContext()
        {
        }

        public LoginDBContext(DbContextOptions<LoginDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Privilege> Privileges { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
        public virtual DbSet<UserPrivilige> UserPriviliges { get; set; }
        public virtual DbSet<UsersLogin> UsersLogins { get; set; }
        public virtual DbSet<Articulo> Articulo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Privilege>(entity =>
            {
                entity.ToTable("Privilege");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("RefreshToken");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Expires).HasColumnType("smalldatetime");

                entity.Property(e => e.Token)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.UsersLogin)
                    .WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.UsersLoginId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersLogin_RefreshToken");
            });

            modelBuilder.Entity<UserPrivilige>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.HasOne(d => d.Privilege)
                    .WithMany(p => p.UserPriviliges)
                    .HasForeignKey(d => d.PrivilegeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Privilege_UserPriviliges");

                entity.HasOne(d => d.UsersLogin)
                    .WithMany(p => p.UserPriviliges)
                    .HasForeignKey(d => d.UsersLoginId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersLogin_UserPriviliges");
            });

            modelBuilder.Entity<UsersLogin>(entity =>
            {
                entity.ToTable("UsersLogin");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Salt)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
            modelBuilder.Entity<Articulo>(entity =>
            {
                entity.ToTable("Articulo");
                entity.Property(e => e.ID).HasColumnName("ID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
