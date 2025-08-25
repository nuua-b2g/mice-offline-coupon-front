import Button from '@/components/common/Button';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { flexRender, Table as TanstackTable } from '@tanstack/react-table';
import styles from './Table.module.css';

type ColumnClassMeta = {
  thClassName?: string;
  tdClassName?: string;
};

export interface TableProps<T> {
  table: TanstackTable<T>;
  showPagination?: boolean;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedRowId?: string;
  totalPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

function Table<T>({
  table,
  showPagination = true,
  showPageSize = false,
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
  emptyMessage = '데이터가 없습니다.',
  onRowClick,
  selectedRowId,
  totalPage = 1,
  currentPage = 0,
  onPageChange,
}: TableProps<T>) {
  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      table.setPageIndex(newPage - 1);
    }
  };

  if (!table) {
    return <div className={styles.emptyCell}>{emptyMessage}</div>;
  }

  const rowModel = table.getRowModel();
  const hasData = rowModel.rows.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={(() => {
                      const meta = header.column.columnDef.meta as ColumnClassMeta | undefined;
                      const thClassKey = meta?.thClassName;
                      return thClassKey
                        ? (styles as Record<string, string>)[thClassKey]
                        : undefined;
                    })()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {hasData ? (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={`${onRowClick ? styles.clickableRow : ''} ${
                    selectedRowId && (row.original as Record<string, unknown>).idx === selectedRowId
                      ? styles.selectedRow
                      : ''
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className={(() => {
                        const meta = cell.column.columnDef.meta as ColumnClassMeta | undefined;
                        const tdClassKey = meta?.tdClassName;
                        return tdClassKey
                          ? (styles as Record<string, string>)[tdClassKey]
                          : undefined;
                      })()}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getAllColumns().length} className={styles.emptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && hasData && (
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            <span>
              {currentPage + 1} / {totalPage}
            </span>
            {showPageSize && (
              <div className={styles.paginationSize}>
                <span>페이지당 행:</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {pageSizeOptions.map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className={styles.paginationButtons}>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
            >
              <DoubleLeftOutlined />
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <LeftOutlined />
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage + 1 === totalPage}
            >
              <RightOutlined />
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(totalPage - 1)}
              disabled={currentPage + 1 === totalPage}
            >
              <DoubleRightOutlined />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;
