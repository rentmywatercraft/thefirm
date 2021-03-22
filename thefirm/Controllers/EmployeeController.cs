using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TheFirm.Models;

namespace TheFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private MyWebApiContext _context;

        public EmployeeController(MyWebApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _context.Employees.ToArray();
        }

        //[HttpPut]
        //public void Update(Employee updatedEmployee)
        //{
        //    _context.Employees.Update(updatedEmployee);
        //    _context.SaveChanges();
        //}

        [HttpPut]
        public void BulkUpdate(Employee[] updatedEmployees)
        {
            foreach (var employee in updatedEmployees)
            {
                _context.Update(employee);
            }
            _context.SaveChanges();
        }

        [HttpPost]
        public bool Create(Employee newEmployee)
        {
            newEmployee.Id = Guid.NewGuid();
            _context.Employees.Add(newEmployee);
            _context.SaveChanges();

            return true;
        }
    }
}
