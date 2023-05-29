import {observer} from 'mobx-react-lite'
import {lazy} from 'react'
import {useRoutes} from 'react-router-dom'
// @ts-ignore
import RoutesStore from '../store/RoutesStore.tsx'

export function load(name: string) {
    const Page = lazy(() => import(`../pages/${name}.tsx`))
    return <Page></Page>
}

function MyRouter() {
    return useRoutes(RoutesStore.routes)
}

export default observer(MyRouter)
