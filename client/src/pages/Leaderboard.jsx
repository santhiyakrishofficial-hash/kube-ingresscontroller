import { useEffect, useState } from 'react';
import { getChildren, deleteChild } from '../api';

function Leaderboard() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    try {
      const res = await getChildren();
      setChildren(res.data);
    } catch (err) {
      console.error('Error loading children:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id, name) => {
    try {
      await deleteChild(id);
      showToast(`👋 ${name} profile removed`);
      loadChildren();
    } catch (err) {
      showToast('❌ Failed to delete');
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="loader__spinner"></div>
      </div>
    );
  }

  return (
    <section className="section" id="leaderboard-page">
      <div className="section__header">
        <h1 className="section__title">🏆 Leaderboard</h1>
        <p className="section__subtitle">
          Our amazing learners ranked by total points earned!
        </p>
      </div>

      {children.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🏆</div>
          <p className="empty-state__text">
            No learners yet. Add a child to get started!
          </p>
        </div>
      ) : (
        <div className="leaderboard">
          {children.map((child, i) => (
            <div
              className="leaderboard__item"
              key={child._id}
              style={{
                animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both`,
              }}
            >
              <div
                className={`leaderboard__rank ${
                  i === 0
                    ? 'leaderboard__rank--gold'
                    : i === 1
                    ? 'leaderboard__rank--silver'
                    : i === 2
                    ? 'leaderboard__rank--bronze'
                    : ''
                }`}
              >
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </div>
              <div className="leaderboard__avatar">{child.avatar}</div>
              <div className="leaderboard__info">
                <div className="leaderboard__name">{child.name}</div>
                <div className="leaderboard__age">
                  Age: {child.age} · Activities:{' '}
                  {child.progress.reduce(
                    (sum, p) => sum + p.activitiesCompleted,
                    0
                  )}
                </div>
                {child.badges.length > 0 && (
                  <div className="badges">
                    {child.badges.slice(0, 5).map((b, bi) => (
                      <span className="badge" key={bi}>
                        {b}
                      </span>
                    ))}
                    {child.badges.length > 5 && (
                      <span className="badge">+{child.badges.length - 5} more</span>
                    )}
                  </div>
                )}
              </div>
              <div className="leaderboard__points">
                {child.totalPoints} <span>pts</span>
              </div>
              <button
                className="btn btn--danger btn--small"
                onClick={() => handleDelete(child._id, child.name)}
                title="Remove profile"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default Leaderboard;
