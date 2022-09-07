import { NetlifyAPI } from 'netlify'
import fetch from 'node-fetch'

const accessToken = "INSERT_YOUR TOKEN" // REPLACE THIS WITH YOUR ACCESS TOKEN
const client = new NetlifyAPI(accessToken)

// Grab every site under your account
const sites = await client.listSites()

console.log("Sites found with Xenial:")
for(const site of sites) {
  if(site.build_image === "xenial") {
    console.log(`Site Name: ${site.name}, Site Id: ${site.site_id}`)
    console.log("Performing update...")
    const updatedSite = await fetch(`https://api.netlify.com/api/v1/sites/${site.site_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      // Updating our site to use the appropriate build image
      body: JSON.stringify({
        build_image: "focal"
      })
    })

    const updatedResponse = await updatedSite.json()

    if(updatedResponse.build_image === "focal") {
      console.log("Site has been updated successfully.")
    } else {
      console.log(`Site ${updatedResponse.name} failed to update build image. Manually override.`)
    }
  }
} 

