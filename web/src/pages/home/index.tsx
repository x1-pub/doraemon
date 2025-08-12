import { useState } from "react"
import { useNavigate } from 'react-router'

import styles from './index.module.less'

const Home = () => {
  const navigate = useNavigate()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const features = [
    {
      id: "config-center",
      title: "配置中心",
      description: "安全存放敏感数据配置",
      details: "加密存储，权限管控，让你的配置信息安全无忧",
      icon: "🛡️",
    },
    {
      id: "image-storage",
      title: "图床服务",
      description: "轻松存储和管理你的图片",
      details: "支持多种图片格式，提供CDN加速，让你的图片加载飞快",
      icon: "🖼️",
    },
  ]

  return (
    <div className={styles.homepage}>
      {/* Header */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            {/* <div className={styles['logo-icon']}>✨</div> */}
            <h1 className={styles['logo-text']}>DORAEMON</h1>
          </div>
          <div className={styles['nav-actions']}>
            <button className={`${styles['btn-ghost']} ${styles.btn}`} onClick={() => window.open('https://github.com/x1-pub/doraemon')}>
              {/* <span className={styles['btn-icon']}>📁</span> */}
              GitHub
            </button>
            <button className={`${styles['btn-primary']} ${styles.btn}`} onClick={() => navigate('/detail')}>开始使用</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles['hero-content']}>
          <div className={styles.badge}>
            <span className={styles['badge-icon']}>✨</span>
            像哆啦A梦的口袋一样神奇
          </div>

          <h2 className={styles['hero-title']}>你的万能工具箱</h2>

          <p className={styles['hero-description']}>
            DORAEMON 就像哆啦A梦的神奇口袋，为你提供配置管理和图床两大核心功能，让你的开发工作更加便捷高效
          </p>

          <div className={styles['hero-actions']}>
            <button className={`${styles['btn-primary']} ${styles['btn-large']} ${styles.btn}`} onClick={() => navigate('/detail')}>
              立即体验
              <span className={styles['btn-icon']}>→</span>
            </button>
            {/* <button className={`${styles['btn-outline']} ${styles['btn-large']} ${styles.btn}`}>了解更多</button> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles['features-header']}>
          <h3 className={styles['section-title']}>核心功能</h3>
          <p className={styles['section-description']}>两大核心功能，满足你的多场景需求</p>
        </div>

        <div className={styles['features-grid']}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${styles['feature-card']} ${hoveredCard === feature.id ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={styles['feature-header']}>
                <div className={styles['feature-icon']}>{feature.icon}</div>
                <h4 className={styles['feature-title']}>{feature.title}</h4>
                <p className={styles['feature-description']}>{feature.description}</p>
              </div>

              <div className={styles['feature-content']}>
                <p className={styles['feature-details']}>{feature.details}</p>
                <button className={styles['feature-link']}>
                  了解详情
                  <span className={styles['feature-link-icon']}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles['stats-grid']}>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>10K+</div>
            <div className={styles['stat-label']}>图片存储</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>99.999%</div>
            <div className={styles['stat-label']}>服务可用性</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>1000+</div>
            <div className={styles['stat-label']}>活跃用户</div>
          </div>
          <div className={styles['stat-item']}>
            <div className={styles['stat-number']}>24/7</div>
            <div className={styles['stat-label']}>技术支持</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles['cta-content']}>
          <h3 className={styles['cta-title']}>准备开始了吗？</h3>
          <p className={styles['cta-description']}>加入我们，体验像哆啦A梦口袋一样神奇的工具</p>
          <button className={`${styles['btn-primary']} ${styles['btn-large']} ${styles.btn}`} onClick={() => navigate('/detail')}>
            免费开始使用
            <span className={styles['btn-icon']}>→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-logo']}>
            {/* <div className={styles['footer-logo-icon']}>✨</div> */}
            <span className={styles['footer-logo-text']}>DORAEMON</span>
          </div>
          <div className={styles['footer-credits']}>
            <span>©2024 - 2025</span>
            <span>by x1.pub</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
