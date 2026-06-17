import { useEffect, useState } from 'react';
import {
  getActivities,
  getSkills,
  createActivity,
  deleteActivity,
  getChildren,
  completeActivity,
} from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    skill: '',
    difficulty: 'Easy',
    points: 10,
    duration: 15,
  });

  useEffect(() => {
    loadData();
  }, [selectedSkill]);

  const loadData = async () => {
    try {
      const [activitiesRes, skillsRes, childrenRes] = await Promise.all([
        getActivities(selectedSkill || undefined),
        getSkills(),
        getChildren(),
      ]);
      setActivities(activitiesRes.data);
      setSkills(skillsRes.data);
      setChildren(childrenRes.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createActivity(form);
      setForm({
        title: '',
        description: '',
        skill: '',
        difficulty: 'Easy',
        points: 10,
        duration: 15,
      });
      setShowForm(false);
      showToast('🎉 Activity created!');
      loadData();
    } catch (err) {
      showToast('❌ Failed to create activity');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
      showToast('🗑️ Activity deleted');
      loadData();
    } catch (err) {
      showToast('❌ Failed to delete');
    }
  };

  const handleComplete = async (activityItem) => {
    if (children.length === 0) {
      showToast('👶 Add a child first!');
      return;
    }
    try {
      // Complete for the first child (simplified)
      const child = children[0];
      const skillId = activityItem.skill?._id || activityItem.skill;
      await completeActivity(child._id, {
        skillId,
        points: activityItem.points,
      });
      showToast(`🌟 ${child.name} earned ${activityItem.points} points!`);
      loadData();
    } catch (err) {
      showToast('❌ Failed to complete activity');
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
    <section className="section" id="activities-page">
      <div className="section__header">
        <h1 className="section__title">🎮 Learning Activities</h1>
        <p className="section__subtitle">
          Choose an activity to earn points and level up!
        </p>
      </div>

      {/* Filter & Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        <select
          className="form__select"
          style={{ maxWidth: '250px' }}
          value={selectedSkill}
          onChange={(e) => {
            setSelectedSkill(e.target.value);
            setLoading(true);
          }}
          id="skill-filter"
        >
          <option value="">All Skills</option>
          {skills.map((s) => (
            <option key={s._id} value={s._id}>
              {s.icon} {s.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn--primary btn--small"
          onClick={() => setShowForm(!showForm)}
          id="toggle-form-btn"
        >
          {showForm ? '✕ Close' : '➕ New Activity'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="form" style={{ marginBottom: '40px' }}>
          <h3 className="form__title">Create New Activity</h3>
          <form onSubmit={handleCreate}>
            <div className="form__group">
              <label className="form__label">Title</label>
              <input
                className="form__input"
                type="text"
                placeholder="e.g., Count the Stars ⭐"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                id="activity-title-input"
              />
            </div>
            <div className="form__group">
              <label className="form__label">Description</label>
              <input
                className="form__input"
                type="text"
                placeholder="What will kids learn?"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                id="activity-desc-input"
              />
            </div>
            <div className="form__group">
              <label className="form__label">Skill</label>
              <select
                className="form__select"
                value={form.skill}
                onChange={(e) => setForm({ ...form, skill: e.target.value })}
                required
                id="activity-skill-select"
              >
                <option value="">Select a skill</option>
                {skills.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}
            >
              <div className="form__group">
                <label className="form__label">Difficulty</label>
                <select
                  className="form__select"
                  value={form.difficulty}
                  onChange={(e) =>
                    setForm({ ...form, difficulty: e.target.value })
                  }
                  id="activity-difficulty-select"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="form__group">
                <label className="form__label">Points</label>
                <input
                  className="form__input"
                  type="number"
                  min="5"
                  max="100"
                  value={form.points}
                  onChange={(e) =>
                    setForm({ ...form, points: parseInt(e.target.value) })
                  }
                  id="activity-points-input"
                />
              </div>
              <div className="form__group">
                <label className="form__label">Duration (min)</label>
                <input
                  className="form__input"
                  type="number"
                  min="5"
                  max="120"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: parseInt(e.target.value) })
                  }
                  id="activity-duration-input"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn--primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              id="create-activity-btn"
            >
              🎮 Create Activity
            </button>
          </form>
        </div>
      )}

      {/* Activities Grid */}
      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🎮</div>
          <p className="empty-state__text">
            No activities yet. Create one to get started!
          </p>
          <button
            className="btn btn--primary"
            onClick={() => setShowForm(true)}
          >
            ➕ Create First Activity
          </button>
        </div>
      ) : (
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <div
              className="activity-card"
              key={activity._id}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.06}s both`,
              }}
            >
              <div className="activity-card__header">
                <span style={{ fontSize: '1.6rem' }}>
                  {activity.skill?.icon || '🎯'}
                </span>
                <span
                  className={`activity-card__difficulty activity-card__difficulty--${activity.difficulty}`}
                >
                  {activity.difficulty}
                </span>
              </div>
              <h3 className="activity-card__title">{activity.title}</h3>
              <p className="activity-card__desc">{activity.description}</p>
              <div className="activity-card__footer">
                <div className="activity-card__meta">
                  <span className="activity-card__meta-item">
                    ⭐ {activity.points} pts
                  </span>
                  <span className="activity-card__meta-item">
                    ⏱️ {activity.duration} min
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn--primary btn--small"
                    onClick={() => handleComplete(activity)}
                    title="Complete this activity"
                  >
                    ✅
                  </button>
                  <button
                    className="btn btn--danger btn--small"
                    onClick={() => handleDelete(activity._id)}
                    title="Delete activity"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </section>
  );
}

export default Activities;
