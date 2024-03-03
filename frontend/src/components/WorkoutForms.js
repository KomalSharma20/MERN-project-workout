import {useState} from 'react'  
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const WorkoutForm=()=>{
    const{dispatch}=useWorkoutsContext()
    const [title,setTitle]=useState('')
    const [reps,setReps]=useState('')
    const [load,setLoad]=useState('')
    const[error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])
    const handleSubmit= async(e)=>{
        e.preventDefault()

        const workout={title,load,reps}
        const response=await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            alert("New Workout Added")
            setEmptyFields([])
            dispatch({type:'CREATE_WORKOUT',payload:json})

        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
        <h3>Add to Existing</h3>
        <label>Exercise Name:</label>
        <input type="text" 
        onChange={(e)=>setTitle(e.target.value)}
        value={title} 
        className={emptyFields.includes('title') ? 'error': ''}
        />

        <label>Reps Name:</label>
        <input type="number" 
        onChange={(e)=>setReps(e.target.value)}
        value={reps} 
        className={emptyFields.includes('reps') ? 'error': ''}
        />


        <label>Load:</label>
        <input type="number"
         onChange={(e)=>setLoad(e.target.value)}
        value={load} 
        className={emptyFields.includes('load') ? 'error': ''}
        />
        <button>SUBMIT</button>
        {error && <div className='error'>{error}</div>}
      </form>
    )
    
}
export default WorkoutForm