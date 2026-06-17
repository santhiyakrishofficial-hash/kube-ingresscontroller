import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSkills, seedSkills, getChildren, healthCheck } from '../api';

function Home() {
  const [skills, setSkills] = useState([]);
  const [children, setChildren] = useState([]);
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Check API health
        const healthRes = await healthCheck();
        setApiStatus(healthRes.data.status);

        // Seed skills if needed
        await seedSkills();

        // Fetch data
        const [skillsRes, childrenRes] = await Promise.all([
          getSkills(),
          getChildren(),
        ]);
        setSkills(skillsRes.data);
        setChildren(childrenRes.data);
      } catch (err) {
        console.error('Init error:', err);
        setApiStatus('error');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <div className="loader__spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="hero" id="hero-section">
        <div className="hero__badge">
          {apiStatus === 'ok' ? '🟢' : '🔴'} API{' '}
          {apiStatus === 'ok' ? 'Connected' : 'Offline'}
        </div>
        <h1 className="hero__title">
          Learn, Play &<br />
          <span>Grow Together!</span>
        </h1>
        <p className="hero__subtitle">
          A fun and interactive platform where kids develop amazing skills
          through exciting activities, earn points, and unlock achievements! 🎉
        </p>
        <div className="hero__actions">
          <Link to="/skills" className="btn btn--primary" id="explore-skills-btn">
            🎯 Explore Skills
          </Link>
          <Link to="/add-child" className="btn btn--outline" id="get-started-btn">
            🚀 Get Started
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section" id="stats-section">
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-card__value" style={{ color: '#6C5CE7' }}>
              {skills.length}
            </div>
            <div className="stat-card__label">Skills</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value" style={{ color: '#00CEC9' }}>
              {children.length}
            </div>
            <div className="stat-card__label">Learners</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value" style={{ color: '#FD79A8' }}>
              {children.reduce((sum, c) => sum + c.totalPoints, 0)}
            </div>
            <div className="stat-card__label">Total Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__value" style={{ color: '#FDCB6E' }}>
              {children.reduce((sum, c) => sum + c.badges.length, 0)}
            </div>
            <div className="stat-card__label">Badges Earned</div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="section" id="skills-preview">
        <div className="section__header">
          <h2 className="section__title">🌈 Skill Categories</h2>
          <p className="section__subtitle">
            Choose a skill to start your learning adventure
          </p>
        </div>
        <div className="skills-grid">
          {skills.slice(0, 4).map((skill, index) => (
            <div
              className="skill-card"
              key={skill._id}
              style={{
                '--skill-color': skill.color,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="skill-card__icon">{skill.icon}</div>
              <h3 className="skill-card__name">{skill.name}</h3>
              <p className="skill-card__desc">{skill.description}</p>
              <div className="skill-card__meta">
                <span className="skill-card__levels">
                  📊 {skill.totalLevels} levels
                </span>
              </div>
            </div>
          ))}
        </div>
        {skills.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/skills" className="btn btn--outline">
              View All Skills →
            </Link>
          </div>
        )}
      </section>

      {/* Top Learners Preview */}
      {children.length > 0 && (
        <section className="section" id="top-learners">
          <div className="section__header">
            <h2 className="section__title">🏆 Top Learners</h2>
            <p className="section__subtitle">
              Our star performers this week
            </p>
          </div>
          <div className="leaderboard">
            {children.slice(0, 3).map((child, i) => (
              <div className="leaderboard__item" key={child._id}>
                <div
                  className={`leaderboard__rank ${
                    i === 0
                      ? 'leaderboard__rank--gold'
                      : i === 1
                      ? 'leaderboard__rank--silver'
                      : 'leaderboard__rank--bronze'
                  }`}
                >
                  #{i + 1}
                </div>
                <div className="leaderboard__avatar">{child.avatar}</div>
                <div className="leaderboard__info">
                  <div className="leaderboard__name">{child.name}</div>
                  <div className="leaderboard__age">Age: {child.age}</div>
                </div>
                <div className="leaderboard__points">
                  {child.totalPoints} <span>pts</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
