import React from 'react';
import './KanbanCardTemplate.css';

interface CardData {
  entryno: number;
  wrkcat: string;
  asgby_name: string;
  asgdt: string;
  photo_url?: string;
  priority?: string;
  duedate?: string;
  description?: string;
  [key: string]: any;
}

const KanbanCardTemplate: React.FC<{ data: CardData }> = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  const getPriorityClass = (priority?: string) => {
    if (!priority) return 'priority-normal';
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'priority-critical';
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-normal';
    }
  };

  return (
    <div className="card-template">
      <div className="card-template-wrap">
        <table className="card-template-wrap">
          <colgroup>
            <col style={{ width: "65px" }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td className="e-image">
                {data.photo_url && (
                  <img
                    src={data.photo_url}
                    alt={data.asgby_name}
                    onError={(e: any) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                )}
              </td>
              <td className="e-title">
                <div className="e-card-stacked">
                  <div className="e-card-header">
                    <div className="e-card-header-caption">
                      <div className="e-card-header-title e-tooltip-text">
                        Entry #{data.entryno}
                      </div>
                    </div>
                  </div>
                  <div className="e-card-content" style={{ lineHeight: "1.8em" }}>
                    <table className="card-template-wrap" style={{ tableLayout: "auto" }}>
                      <tbody>
                        <tr>
                          <td colSpan={2}>
                            <div className="e-category e-tooltip-text">
                              {data.wrkcat}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="card-content">
                            <div className="e-assignee">
                              <span className="e-label">Assigned:</span>
                              <span className="e-value e-tooltip-text">{data.asgby_name}</span>
                            </div>
                          </td>
                          {data.priority && (
                            <td className="card-content">
                              <span className={`e-priority-badge ${getPriorityClass(data.priority)}`}>
                                {data.priority}
                              </span>
                            </td>
                          )}
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <div className="e-card-dates">
                              {data.asgdt && (
                                <div className="e-date-item">
                                  <label className="e-date-label">Date:</label>
                                  <span className="e-date-value">{formatDate(data.asgdt)}</span>
                                </div>
                              )}
                              {data.duedate && (
                                <div className="e-date-item">
                                  <label className="e-date-label">Due:</label>
                                  <span className="e-date-value">{formatDate(data.duedate)}</span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                        {data.description && (
                          <tr>
                            <td colSpan={2}>
                              <div className="e-description e-tooltip-text">
                                {data.description.substring(0, 60)}
                                {data.description.length > 60 ? '...' : ''}
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KanbanCardTemplate;
