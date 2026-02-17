
cardList = document.getElementById("cardWrap")
/*
<article class="card" role="listitem">
    <h3>Compass Legal Aid <span class="badge">Legal</span></h3>
    <p class="meta">Free consultations for housing, benefits, and rights.</p>
</article>
*/

class cardClass{
    constructor(Title, Description, Category, Phone) {
        this.Title = Title
        this.Description = Description
        this.Category = Category
        this.Phone = Phone
        this.HTMLNodes = null
    }
    CreateNode() {
        //creates article
        const articleNode = document.createElement("article")
        articleNode.className="card"
        articleNode.role="listitem"
        cardList.appendChild(articleNode)
        
        //creates header
        const headerText = document.createElement("h3")
        headerText.textContent = this.Title + " "
        articleNode.appendChild(headerText)

        //creates category badge
        const categoryText = document.createElement("span")
        categoryText.className="badge"
        categoryText.textContent = this.Category
        headerText.appendChild(categoryText)

        //creates phone badge
        const phoneText = document.createElement("span")
        phoneText.className="badge"
        phoneText.textContent = this.Phone
        headerText.appendChild(phoneText)

        //creates description
        const descriptionText = document.createElement("p")
        descriptionText.className="meta"
        descriptionText.textContent = this.Description
        articleNode.appendChild(descriptionText)

        //sets html nodes variable
        this.HTMLNodes={
            articleNode:articleNode,
            headerText:headerText,
            categoryText:categoryText,
            phoneText:phoneText,
            descriptionText:descriptionText,
        }
    }
}

const categoryList = {
    Food: "Food",
    Health: "Health",
    Housing: "Housing",
    Legal: "Legal",
    Youth: "Youth",
    Education: "Education",
    Veteran: "Veteran",
    Crisis: "Crisis",
}

CrisisLine = new cardClass(
    "Emergence Health Network Crisis Line",
    "For mental health emergencies and substance use support.",
    categoryList.Crisis,
    "(915) 779-1800"
)

ElPasoHelps = new cardClass(
    "El Paso Helps",
    'A centralized hub that connects you with a "Resilience Navigator" for housing and basic needs.',
    categoryList.Housing,
    "(915) 400-7401"
)

OpportunityCenter = new cardClass(
    "Opportunity Center for the Homeless",
    "Offers emergency shelter, meals, and laundry services.",
    categoryList.Housing,
    "(915) 577-0069"
)

FoodBank = new cardClass(
    "El Pasoans Fighting Hunger Food Bank",
    "They operate mobile pantries and home delivery for seniors/homebound individuals.",
    categoryList.Food,
    "(915) 298-0353"
)

ElPasoHealth = new cardClass(
    "City of El Paso Public Health",
    "Offers dental clinics, immunizations, and WIC services (food assistance for women and children).",
    categoryList.Health,
    "(915) 212-0200"
)

VeteranAssistance = new cardClass(
    "County Veterans Assistance Office",
    "Helps veterans navigate earned benefits and entitlements.",
    categoryList.Veteran,
    "(915) 273-3454"
)



CrisisLine.CreateNode()
ElPasoHelps.CreateNode()
OpportunityCenter.CreateNode()
FoodBank.CreateNode()
ElPasoHealth.CreateNode()
VeteranAssistance.CreateNode()


// 2. Initialize the App with your App ID
const APP_ID = "mdb_sa_id_6992827c7a33c0edd85bd618";
const app = new Realm.App({ id: APP_ID });

async function runSearch() {
    const query = document.getElementById('searchInput').value;
    
    // 3. Log in anonymously
    const user = await app.logIn(Realm.Credentials.anonymous());
    
    // 4. Connect to the database collection
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongodb.db("tsa_db").collection("events");

    // 5. Simple Search Query
    const results = await collection.find({
        name: { $regex: query, $options: "i" } // "i" makes it case-insensitive
    });
    console.log("Results are here Today:")
    console.log(results)
    // 6. Display Results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results.map(item => `
        <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}