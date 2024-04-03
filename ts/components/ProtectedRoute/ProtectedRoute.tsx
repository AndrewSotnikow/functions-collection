import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../../work/dottv-web/typescript/src/shared/store'

interface RequireProfileProps {
    children: JSX.Element
}

const RequireProfile: React.FC<RequireProfileProps> = ({ children }) => {
    const { lastUsedProfile } = useAppStore()
    const location = useLocation()

    if (!lastUsedProfile?.profile_name) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}

export default RequireProfile
