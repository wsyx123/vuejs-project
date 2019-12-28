// log components
import log from '@/components/log/log'
import search from '@/components/log/search'
import newDashboard from '@/components/log/newDashboard'
import importDashboard from '@/components/log/importDashboard'
import analysis from '@/components/log/analysis'
import join from '@/components/log/join'
import transmit from '@/components/log/transmit'




export const Parent = {
    home:  {component: () => import('@/components/dashboard/Home')},
	admin: {component: () => import('@/components/admin/admin')},
    log:   {component: () => import('@/components/log/log')}
}

export const Children = {
    business: {component: () => import('@/components/admin/business')},
    host:     {component: () => import('@/components/admin/host')},
    structure:     {component: () => import('@/components/admin/structure')},
    user:     {component: () => import('@/components/admin/user')},
    system:     {component: () => import('@/components/admin/system')},
    newDatasource:{component: () => import('@/components/admin/newDatasource')},
    role:     {component: () => import('@/components/admin/business')},
    info:     {component: () => import('@/components/admin/business')},
    search:           {component: search},
    analysis:         {component: analysis},
    newDashboard:     {component: newDashboard},
    importDashboard:  {component: importDashboard},
    viewDashboard:    {component: () => import('@/components/log/viewDashboard')},
    join:             {component: join},
    transmit:         {component: transmit},
    alarmset:         {component: () => import('@/components/log/alarmset')},
    alarmcreate:      {component: () => import('@/components/log/alarmcreate')},
    alarmedit:        {component: () => import('@/components/log/alarmcreate')},
    alarmlist:        {component: log}
}