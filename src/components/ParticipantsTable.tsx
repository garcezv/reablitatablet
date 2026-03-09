import { useState, useEffect } from 'react';
import { fetchParticipants, type ParticipantWithTest } from '@/lib/participants';
import { useI18n } from '@/lib/i18n';
import { MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Download, Loader2 } from 'lucide-react';

interface ParticipantsTableProps {
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  showLinesPerPage?: boolean;
  refreshKey?: number;
}

export default function ParticipantsTable({ selectedIds, onSelectionChange, showLinesPerPage, refreshKey }: ParticipantsTableProps) {
  const { t } = useI18n();
  const [participants, setParticipants] = useState<ParticipantWithTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    fetchParticipants()
      .then(data => setParticipants(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const totalPages = Math.max(1, Math.ceil(participants.length / perPage));
  const paged = participants.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id)
        ? selectedIds.filter(s => s !== id)
        : [...selectedIds, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === paged.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(paged.map(p => p.id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (participants.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-muted-foreground">
        Nenhum participante cadastrado.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <select className="border border-input rounded-md px-2 py-1 text-xs bg-background">
          <option>{t('panel.statusFilter')}</option>
        </select>
        <select className="border border-input rounded-md px-2 py-1 text-xs bg-background">
          <option>{t('panel.reevalFilter')}</option>
        </select>
        <select className="border border-input rounded-md px-2 py-1 text-xs bg-background">
          <option>{t('panel.testFilter')}</option>
        </select>
        <button className="text-xs text-primary flex items-center gap-1">
          <Filter className="w-3 h-3" /> {t('panel.applyFilters')}
        </button>
        <div className="ml-auto">
          <Download className="w-4 h-4 text-primary cursor-pointer" />
        </div>
      </div>

      {/* Selection info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>📋</span>
          <span>{selectedIds.length} {t('panel.selected')}</span>
        </div>
        <button className="p-1 border border-border rounded">
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 px-1 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.length === paged.length && paged.length > 0}
                  onChange={toggleAll}
                  className="accent-primary"
                />
              </th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.name')}</th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.testDone')}</th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.lastTestDate')}</th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.hearingStatus')}</th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.needsReeval')}</th>
              <th className="py-2 px-2 text-left font-medium text-foreground">{t('panel.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(p => (
              <tr key={p.id} className={`border-b border-border ${selectedIds.includes(p.id) ? 'bg-info/30' : ''}`}>
                <td className="py-2 px-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                    className="accent-primary"
                  />
                </td>
                <td className="py-2 px-2 text-foreground">{p.full_name}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.testPerformed === 'Aud.IT'
                      ? 'bg-badge-audit text-badge-audit-foreground'
                      : 'bg-badge-ouvir text-badge-ouvir-foreground'
                  }`}>
                    {p.testPerformed}
                  </span>
                </td>
                <td className="py-2 px-2 text-foreground">{p.lastTestDate}</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.hearingStatus === 'Normal'
                      ? 'bg-badge-normal text-badge-normal-foreground'
                      : 'bg-badge-altered text-badge-altered-foreground'
                  }`}>
                    {p.hearingStatus}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    p.needsReevaluation
                      ? 'bg-badge-yes text-badge-yes-foreground'
                      : 'text-foreground'
                  }`}>
                    {p.needsReevaluation ? t('common.yes') : t('common.no')}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <button className="p-1 border border-border rounded">
                    <MoreVertical className="w-3.5 h-3.5 text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t('panel.showing')} {paged.length} {t('panel.of')} {participants.length} {t('panel.items')}</span>
        <div className="flex items-center gap-1">
          {showLinesPerPage && (
            <div className="flex items-center gap-1 mr-4">
              <span>{t('manage.linesPerPage')}</span>
              <select
                value={perPage}
                onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
                className="border border-input rounded px-1 py-0.5 text-xs bg-background"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          )}
          <button onClick={() => setPage(1)} disabled={page === 1} className="p-1 border border-border rounded disabled:opacity-30">
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1 border border-border rounded disabled:opacity-30">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-semibold text-foreground">{String(page).padStart(2, '0')}</span>
          <span>/ {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1 border border-border rounded disabled:opacity-30">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="p-1 border border-border rounded disabled:opacity-30">
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
