import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database'
type Profiles = Database['public']['Tables']['profiles']['Row']

interface AccountProps {
  session: Session;
  onClose: () => void;
}

export default function Account({ session, onClose }: AccountProps) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<Profiles['fullname']>(null)
  const [practice, setPractice] = useState<Profiles['practice']>(null)
  const [practiceAddress, setPracticeAddress] = useState<Profiles['practice_address']>(null)
  const [phonenumber, setPhonenumber] = useState<Profiles['phonenumber']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const handleCancel = () => {
    onClose(); // Call the onClose prop to close the popup
  };

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`fullname, practice, practice_address, phonenumber`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.fullname)
        setPractice(data.practice)
        setPracticeAddress(data.practice_address)
        setPhonenumber(data.phonenumber)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    fullname,
    practice,
    practiceAddress,
    phonenumber,
  }: {
    fullname: Profiles['fullname']
    practice: Profiles['practice']
    practiceAddress: Profiles['practice_address']
    phonenumber: Profiles['phonenumber']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        fullname: fullname,
        updated_at: new Date().toISOString(),
        practice: practice,
        practice_address: practiceAddress,
        phonenumber: phonenumber
      }
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
      onClose();
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='popup-container'>
      <div className="form-widget">
        <h1 className="place-self-start font-semibold text-base text-[#5473E3]" style={{ fontSize: '25px', paddingBottom: '8px' }}>Your Account Details</h1>
        <div>
          <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled style={{ borderRadius: '10px', marginBottom: '15px' }}/>
        </div>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            id="fullname"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            style={{ borderRadius: '10px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label htmlFor="practice name">Practice Name</label>
          <input
            id="practice"
            type="text"
            value={practice || ''}
            onChange={(e) => setPractice(e.target.value)}
            style={{ borderRadius: '10px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label htmlFor="practice address">Practice Address</label>
          <input
            id="practiceAddress"
            type="text"
            value={practiceAddress || ''}
            onChange={(e) => setPracticeAddress(e.target.value)}
            style={{ borderRadius: '10px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <label htmlFor="phone number">Practice Phone Number</label>
          <input
            id="phonenumber"
            type="text"
            value={phonenumber || ''}
            onChange={(e) => setPhonenumber(e.target.value)}
            style={{ borderRadius: '10px', marginBottom: '15px' }}
          />
        </div>
        <div>
          <div>
            <button
              className="rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[25rem] p-3 mt-5 hover:bg-[#2347C5] mb-5"
              onClick={() => updateProfile({ fullname, practice, practiceAddress, phonenumber })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update Account'}
            </button>
          </div>
          <div>
            <button className="rounded-full bg-[#3D5FD9] text-[#F5F7FF] w-[25rem] p-3 hover:bg-[#2347C5] mb-5" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>
          <div>
            <button className="rounded-full bg-[#bebebe] text-[#F5F7FF] w-[25rem] p-3 hover:bg-[#545454] mb-5" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}