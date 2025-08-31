import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'
import {afterEach, beforeAll, afterAll} from 'vitest'


afterEach(()=> {cleanup()})

beforeAll(() => {
    console.log("before all")
})

afterAll(()=>{
    console.log("after all..")
})




