"use client"

import { setUser } from "@/lib/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export const Authenticator = ({ children }) => {
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    // if (!user && path !== "/login" && path !== "/signup") {
    //   router.push("/login")
    // }
    if (!user) dispatch(setUser({
      name: "FakeShah141",
      password: "FakeBoi@123",
      email: "fakeshah141@test.com",
      avatarLink: "#"
    }))
  }, [user, path])

  return (
    <>{children}</>
  )
}
