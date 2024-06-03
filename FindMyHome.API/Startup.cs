using FindMyHome.BusinessLogic.Services;
using FindMyHome.Common;
using FindMyHome.DataAccess;
using FindMyHome.DataAccess.Repositories;
using FindMyHome.Domain.Entities;
using FindMyHome.Domain.Interfaces;
using FindMyHome.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace FindMyHome.API;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        Settings.SetConfig(configuration);
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // Swagger configuration
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "FindMyHome API",
                Version = Settings.Version,
                Description = "Description for the API goes here.",
            });
        });

        // Database configuration using the connection string  from appsettings
        services.AddDbContext<FindMyHomeContext>(options => options.UseSqlServer(Settings.DatabaseConnectionString));

        // Cors configuration
        services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

        // UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>(_ => new UnitOfWork(Settings.DatabaseConnectionString));

        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRepository<County>, Repository<County>>();
        services.AddScoped<IRepository<City>, Repository<City>>();
        services.AddScoped<IRepository<ListingType>, Repository<ListingType>>();
        services.AddScoped<IRepository<Listing>, Repository<Listing>>();

        // Services
        services.AddScoped<UserService>();

        // JWT authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Settings.TokenSecretBytes),
                ValidateIssuer = false,
                ClockSkew = TimeSpan.Zero,
                ValidateAudience = false
            };
        });

        // Azure Application Insights configuration
        services.AddApplicationInsightsTelemetry();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        using (var scope = app.ApplicationServices.CreateScope())
        {
            var dbcontext = scope.ServiceProvider.GetRequiredService<FindMyHomeContext>();
            
            dbcontext.Database.Migrate();
        }
        // Enable middleware to serve generated Swagger as a JSON endpoint.
        app.UseSwagger();

        // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
        // specifying the Swagger JSON endpoint.
        app.UseSwaggerUI(options =>
        {
            // Swagger endpoint
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Schedent API " + Settings.Version);

            // To serve SwaggerUI at application's root page, set the RoutePrefix property to an empty string.
            options.RoutePrefix = string.Empty;
        });

        // Adds middleware for redirecting HTTP requests to  HTTPS
        app.UseHttpsRedirection();

        app.UseRouting();

        // Enable authorization capabilities
        app.UseAuthorization();

        // Allow cross domain requests
        app.UseCors("AllowAllOrigins");

        app.UseEndpoints(endpoints =>
        {
            // Add endpoints for controller actions without specifying any routes
            endpoints.MapControllers();
        });
    }
}
