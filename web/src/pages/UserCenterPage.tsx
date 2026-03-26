const UserCenterPage = () => (
  <main className="space-y-3 px-3 pb-24 pt-4">
    <header className="flex items-center justify-between rounded-2xl bg-brand-gradient p-4 text-white shadow-card">
      <div>
        <p className="text-xs text-white/80">Lv.3 Member</p>
        <h1 className="mt-1 text-2xl font-semibold">Alex Li</h1>
      </div>
      <button type="button" className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-sm">
        Edit
      </button>
    </header>

    <section className="rounded-2xl bg-white p-3 shadow-card">
      <h2 className="mb-2 text-base font-semibold text-slate-900">Assets</h2>
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: '1280', label: 'Points' },
          { value: '6', label: 'Coupons' },
          { value: '¥230', label: 'Balance' },
        ].map((item) => (
          <article key={item.label} className="rounded-xl bg-brand-50 p-3 text-center">
            <strong className="block text-base text-brand-800">{item.value}</strong>
            <span className="text-xs text-slate-500">{item.label}</span>
          </article>
        ))}
      </div>
    </section>

    <section className="rounded-2xl bg-white p-3 shadow-card">
      <h2 className="mb-2 text-base font-semibold text-slate-900">Orders</h2>
      <div className="grid grid-cols-4 gap-2">
        {['To Pay', 'To Ship', 'To Receive', 'After Sale'].map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-1 py-2 text-xs text-slate-700"
          >
            {item}
          </button>
        ))}
      </div>
    </section>

    <section className="rounded-2xl bg-white p-3 shadow-card">
      <h2 className="mb-2 text-base font-semibold text-slate-900">Common Tools</h2>
      <ul className="divide-y divide-slate-100 text-sm text-slate-700">
        {['Address', 'Invoice', 'Support', 'Settings'].map((item) => (
          <li key={item} className="py-2.5">
            {item}
          </li>
        ))}
      </ul>
    </section>
  </main>
)

export default UserCenterPage
