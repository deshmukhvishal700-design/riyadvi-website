import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import BusinessHealthCheckup from './pages/BusinessHealthCheckup'
import ProjectPlanningGuide from './pages/ProjectPlanningGuide'
import NotFound from './pages/NotFound'

import ServicesIndex from './pages/services/ServicesIndex'
import ServiceDetail from './pages/services/ServiceDetail'

import PortfolioIndex from './pages/portfolio/PortfolioIndex'
import CaseStudy from './pages/portfolio/CaseStudy'

import BlogIndex from './pages/blog/BlogIndex'
import Article from './pages/blog/Article'

import CareersIndex from './pages/careers/CareersIndex'
import JobDetail from './pages/careers/JobDetail'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="business-health-checkup" element={<BusinessHealthCheckup />} />
        <Route path="software-project-planning-guide" element={<ProjectPlanningGuide />} />

        <Route path="services" element={<ServicesIndex />} />
        <Route path="services/:slug" element={<ServiceDetail />} />

        <Route path="portfolio" element={<PortfolioIndex />} />
        <Route path="portfolio/:slug" element={<CaseStudy />} />

        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<Article />} />

        <Route path="careers" element={<CareersIndex />} />
        <Route path="careers/:slug" element={<JobDetail />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
