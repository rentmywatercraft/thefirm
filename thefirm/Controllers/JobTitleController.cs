using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TheFirm.Models;

namespace TheFirm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTitleController : ControllerBase
    {
        private MyWebApiContext _context;

        public JobTitleController(MyWebApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<JobTitle> Get()
        {
            return _context.JobTitles.ToArray();
        }

        [HttpPut]
        public void Update(JobTitle updatedTitle)
        {
            var result = _context.JobTitles.Update(updatedTitle);
            _context.SaveChanges();
        }

        [HttpPost]
        public void Create(JobTitle newTitle)
        {
            newTitle.Id = Guid.NewGuid();
            var result = _context.JobTitles.Add(newTitle);
            _context.SaveChanges();
        }
    }
}
