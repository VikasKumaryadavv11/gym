export default function sitemap(){return ['','/about','/programs','/trainers','/membership','/gallery','/contact'].map(path=>({url:`https://ironpeak.fit${path}`,lastModified:new Date()}))}
