import React from 'react';
import {FiEdit, FiTrash} from 'react-icons/fi';

const CustomerList = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Customer List</h1>
      <section className="rounded-md bg-white shadow">
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
              <tr className="[&_th]:border [&_th]:border-neutral-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left">
                {/* <th>#</th> */}
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Cancle</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody className="[&_td]:border [&_td]:border-neutral-200 [&_td]:px-4 [&_td]:py-2">
              <tr
                // key=1
                className="hover:bg-gray-50 even:bg-gray-50/50 odd:bg-white"
              >
                {/* <td>{index + 1}</td> */}
                <td className="whitespace-nowrap">tutuy</td>

                <td>67</td>
                <td className="">
                  {' '}
                  <button
                  // onClick={(e) => {
                  //   e.stopPropagation();
                  //   handleDelete(item.id);
                  // }}
                  >
                    <FiTrash size={20} className="ml-4 text-red-500" />
                  </button>
                </td>
                <td>
                  <button
                  //  onClick={() => onEditPress(item)}
                  >
                    <FiEdit size={20} className="ml-4 text-blue-500" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CustomerList;
