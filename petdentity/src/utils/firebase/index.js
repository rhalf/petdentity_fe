import { auth } from '@/plugins/firebase'

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

const userData = {
  uid: '06e5gMjNfqYwWdDlaKOP7daErjx1',
  email: 'rhalfcaacbay@gmail.com',
  emailVerified: true,
  isAnonymous: false,
  providerData: [
    {
      providerId: 'password',
      uid: 'rhalfcaacbay@gmail.com',
      displayName: null,
      email: 'rhalfcaacbay@gmail.com',
      phoneNumber: null,
      photoURL: null
    }
  ],
  stsTokenManager: {
    refreshToken:
      'APZUo0SGoVFs2n2PgVNIzUXG4SiYwZbNfvwDM-AKFyhG_VqZLi3WL-lLfkRObOVY8Ei_F0CifYBUsyOxQEosPGrFCHAEFmNONQ1QSRQmXxt6Yv8cYskPVMWPK-_k-8UE9p1U8baGe4HklOYX6lU7Fb_K0nsj0e47oSkh1jZjyteVa-eBI2hdJJaxqGbw7-i-J6_RDC7aFQd0LQaPmcvRQFE_HMJ80K3H9Q',
    accessToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NWUyNDZjNTEwNmExMGQ2MzFiMTA0M2E3MWJiNTllNWJhMGM5NGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGV0ZGVudGl0eS1iNmIzYiIsImF1ZCI6InBldGRlbnRpdHktYjZiM2IiLCJhdXRoX3RpbWUiOjE2ODYzNzAxNDYsInVzZXJfaWQiOiIwNmU1Z01qTmZxWXdXZERsYUtPUDdkYUVyangxIiwic3ViIjoiMDZlNWdNak5mcVl3V2REbGFLT1A3ZGFFcmp4MSIsImlhdCI6MTY4NjM4MDA2NCwiZXhwIjoxNjg2MzgzNjY0LCJlbWFpbCI6InJoYWxmY2FhY2JheUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJyaGFsZmNhYWNiYXlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cYETi5xDqB-5O-sK0qshWcWNSssZqvm8JRSWh4NNM1M4yDprqS5hbx3ZEFYRr4Wetjg2baZh4EAVUZ76VjmnRhQwRM6gPjdYVQ8RNqdO-RutDlt6OuVDQZ5kNH4lsHPDV48hGmDxNLXkOkMVSJprlfM9_4m7gD05zClbRhgTDs81OXJb8ntzM__vQRtErKy6n14AcaCs5cRWF8IM-ODsWy95Nz-VSuNKkVtTRBEeTQMaK9jhHtTCOTHOB0737EjTUQFVm8N7a_kZnfOoa866siepCS1lwncpGmlN1rWy7d3q7ymxRXZ2FQoE7_DKn3ZA_oihrHHfH06JR8K-38gOCQ',
    expirationTime: 1686383665150
  },
  createdAt: '1681206054637',
  lastLoginAt: '1686370146392',
  apiKey: 'AIzaSyC4aWFeXM2zFJrguqva19UzcTjABJsV5PU',
  appName: '[DEFAULT]'
}
