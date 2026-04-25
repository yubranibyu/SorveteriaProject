"use client";

import { createUser } from "../lib/actions/user_actions";
import { useActionState } from "react";
import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./button";

export default function CreateUserForm() {
  const [state, formAction] = useActionState(createUser, {
    message: null,
    errors: {},
  });

  const labelStyles =
    "block text-sm font-medium text-gray-700";

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  const iconStyles =
    "h-5 w-5 text-gray-400 absolute right-3 top-9";

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex-1 rounded-3xl bg-white px-8 pb-10 pt-10 shadow-sm border border-slate-100">
        <p className="mb-8 text-sm text-center text-slate-500 italic">
          Start your journey with us by creating an account.
        </p>

        {/* Name */}
        <div className="relative">
          <label className={labelStyles} htmlFor="name">
            Name
          </label>
          <input
            className={inputStyles}
            id="name"
            name="name"
            type="text"
            required
          />
          <UserIcon className={iconStyles} />

          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label className={labelStyles} htmlFor="email">
            Email
          </label>
          <input
            className={inputStyles}
            id="email"
            name="email"
            type="email"
            required
          />
          <AtSymbolIcon className={iconStyles} />

          {state.errors?.email && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className={labelStyles} htmlFor="password">
            Password
          </label>
          <input
            className={inputStyles}
            id="password"
            name="password"
            type="password"
            required
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.password && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className={labelStyles} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={inputStyles}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
          <KeyIcon className={iconStyles} />

          {state.errors?.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="relative">
          <label className={labelStyles} htmlFor="role">
            Account Type
          </label>
          <select
            className={inputStyles}
            id="role"
            name="role"
            required
          >
            <option value="">Choose a role</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <IdentificationIcon className={iconStyles} />

          {state.errors?.role && (
            <p className="mt-1 text-sm text-red-500">
              {state.errors.role[0]}
            </p>
          )}
        </div>

        <Button variant="primary">Create Account</Button>
      </div>
    </form>
  );
}