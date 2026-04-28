
const TableHeader = () => {
  return (
    <thead>
      <tr className="bg-surface-container-low/50">
        <th className="text-label-md px-8 py-5 text-[11px] font-bold tracking-widest text-secondary uppercase">
          Original URL
        </th>
        <th className="text-label-md px-8 py-5 text-[11px] font-bold tracking-widest text-secondary uppercase">
          Short URL
        </th>
        <th className="text-label-md px-8 py-5 text-[11px] font-bold tracking-widest text-secondary uppercase">
          Clicks
        </th>
        <th className="text-label-md px-8 py-5 text-[11px] font-bold tracking-widest text-secondary uppercase">
          Created At
        </th>
        <th className="text-label-md px-8 py-5 text-right text-[11px] font-bold tracking-widest text-secondary uppercase">
          Actions
        </th>
      </tr>
    </thead>
  )
}

export default TableHeader
