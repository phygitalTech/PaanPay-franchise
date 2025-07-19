// components/GenericTable.tsx
import React, {useState, useMemo} from 'react';

export type Column<T> = {
  header: string;
  accessor: keyof T | string;
  cell?: (row: T, index: number) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  searchAble?: boolean;
};

export default function GenericTables<T>({
  data,
  columns,
  itemsPerPage = 5,
  searchAble = false,
}: Props<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchAble || searchQuery.trim() === '') return data;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.accessor as keyof T];
        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery)
        );
      }),
    );
  }, [searchQuery, data, columns, searchAble]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-4">
      {searchAble && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset to first page
          }}
          className="w-full max-w-sm rounded border border-stroke px-4 py-2 text-sm dark:border-strokedark dark:bg-boxdark dark:text-white"
        />
      )}

      <div className="overflow-x-auto rounded-md border border-stroke dark:border-strokedark">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10 bg-neutral-100 text-xs uppercase tracking-wider">
            <tr className="dark:bg-meta-4">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="border border-stroke px-4 py-3 text-center dark:border-strokedark"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-stroke bg-white dark:border-strokedark dark:bg-white"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-stroke px-4 py-3 text-center dark:border-strokedark ${col.className || ''}`}
                    >
                      {col.cell
                        ? col.cell(row, rowIndex)
                        : (row[col.accessor as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded bg-slate-400 px-3 py-1 text-white disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({length: totalPages}, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`rounded px-3 py-1 ${
                i + 1 === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded bg-slate-400 px-3 py-1 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
