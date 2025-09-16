import { ability } from '@/auth/auth'
import { Invites } from './invites'
import { MemberList } from './member-list'

export default async function MembersPage(params: { slug: string }) {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black">Members</h1>

      <div className="space-y-4">
        {permissions?.can('get', 'invite') && <Invites />}
        {permissions?.can('get', 'User') && <MemberList />}
      </div>
    </div>
  )
}
