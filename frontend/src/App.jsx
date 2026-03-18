import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Upload from './pages/Upload'
import MyFiles from './pages/MyFiles'
import Subscription from './pages/Subscription'
import Transactions from './pages/Transactions'
import PublicFileView from './pages/PublicFileView'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import Toaster from 'react-hot-toast'

import { CreditsProvider } from './context/CreditsContext';

function App() {
  return (
    <CreditsProvider>
      <BrowserRouter>
      <Toaster/>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <>
            <SignedIn><Dashboard /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />
        <Route path="/upload" element={
          <>
            <SignedIn><Upload /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />
        <Route path="/my-files" element={
          <>
            <SignedIn><MyFiles /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />
        <Route path="/subscriptions" element={
          <>
            <SignedIn><Subscription /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />
        <Route path="/transactions" element={
          <>
            <SignedIn><Transactions /></SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />

        <Route path="/file/:id" element={<PublicFileView />} />
        <Route path="/*" element={<RedirectToSignIn/>}/>
      </Routes>

      </BrowserRouter>
    </CreditsProvider>
  )
}

export default App