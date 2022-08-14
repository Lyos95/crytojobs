export interface JobPostSection {
    title: string,
    content: string
}

export interface JobPostInterface {
    id: string,
    title: string,
    company: string,
    salary: string,
    tags: [string],
    locations: [string],
    applyLink: string,
  }


export interface JobPostDetailsInterface {
    id: string,
    title: string,
    company: string,
    salary: string,
    tags: [string],
    locations: [string],
    applyLink: string,
    content: [JobPostSection]
}