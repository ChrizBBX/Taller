using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taller.DataAccess.Repositories
{
    interface IRepository<T, U>
    {
        public U Find(int id);
        public IEnumerable<U> List();
        public RequestStatus Insert(T item);
        public RequestStatus Update(T item);
        public RequestStatus Delete(int id);
    }
}
