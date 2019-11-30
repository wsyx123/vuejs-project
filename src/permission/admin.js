// log components
import log from '@/components/log/log'
import search from '@/components/log/search'
import newDashboard from '@/components/log/newDashboard'
import importDashboard from '@/components/log/importDashboard'
import analysis from '@/components/log/analysis'
import join from '@/components/log/join'
import transmit from '@/components/log/transmit'




export const Parent = {
	  admin: {component: () => import('@/components/admin/admin')},
    log:   {component: () => import('@/components/log/log')}
}

export const Children = {
    business: {component: () => import('@/components/admin/business')},
    host:     {component: () => import('@/components/admin/host')},
    user:     {component: () => import('@/components/admin/business')},
    role:     {component: () => import('@/components/admin/business')},
    info:     {component: () => import('@/components/admin/business')},
    search:           {component: search},
    analysis:         {component: analysis},
    newDashboard:     {component: newDashboard},
    importDashboard:  {component: importDashboard},
    join:             {component: join},
    transmit:         {component: transmit}
}