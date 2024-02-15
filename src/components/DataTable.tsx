import React, { useState, ChangeEvent } from 'react';

type Column = {
  field: string;
  label: string;
};

type DataRow = any; //If You want to submit this as a package;) haha  change this to any to avoid conflicts

type DataTableProps = {
  columns: Column[];
  rows: DataRow[];
};

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const pageSize = 10;

  const filteredData = rows.filter((item) =>
    Object.values(item).some(
      (value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
      }
    }

    return 0;
  });

  const pageCount = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative ml-auto">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="w-48 p-2 border border-gray-300 rounded-md"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute right-3 top-2 h-6 w-6 text-gray-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4-4" />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.field}
                  className="p-2 cursor-pointer lg:h-10 lg:p-4 w-40 h-10"
                  onClick={() => handleSort(column.field)}
                >
                  {column.label}
                  {sortColumn === column.field && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className={`bg-white hover:bg-gray-400 hover:text-white`}
                >
                  {columns.map((column) => (
                    <td key={column.field} className="p-2 text-center lg:h-8 lg:m-4 w-40">
                      {item[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center lg:h-8 lg:m-4 w-40">
                  No available data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between p-4 items-center">
        <div className="text-md">Page {page} of {pageCount}</div>
        <div className="flex space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-500 text-white p-1 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
            className="bg-gray-500 text-white p-1 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
