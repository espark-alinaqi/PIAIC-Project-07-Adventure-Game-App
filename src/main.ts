import inquirer from "inquirer";

let sleep = () => new Promise((r) => setTimeout(r, 2000))

console.log(` INSTRUCTIONS :`)

let maxEnemyHealth = 75
let enemyAttackDamage = 50
let enemiesList = [`Skeleton`, `Warrior `, `Zombie  `, `Assassin`]

let health = 100
let attackDamage = 50
let totalHealthPotions = 3
let healthPotionHealAmount = 30
let healthPotionDropChance = 50 // 50% chance

let attackAnimation = (enemy) => new Promise((r) => {
    let stepsDone = []
    let stepsLeft = ['_', '_', '_', '_', '_', '_', '_', '_']
    console.log(`ATTACK:                                          `)
    const animation = setInterval(() => {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`___________/|You|*${stepsLeft.join('')}${enemy}*|\\${stepsDone.join('')}___________`)
        if (!stepsLeft.length) {
            process.stdout.write('\n')
            clearInterval(animation)
            r('')
        }
        stepsLeft.pop()
        stepsDone.push('_')
    }, 300);
})

console.log(`=) You can damage enemy UPTO ${attackDamage} Health`)
console.log(`=) Enemy can damage you UPTO ${enemyAttackDamage} Health`)
let running = true
let isRunAway = false

while (running) {
    let enemy = enemiesList[Math.floor(Math.random() * enemiesList.length)]
    let enemyHealth = Math.ceil(Math.random() * maxEnemyHealth)
    console.log(`\n\n<<<<<<<<<<<<<<  ${`${enemy.trim()} Has Appeared`}  >>>>>>>>>>>>>>`)

    while (enemyHealth > 0) {
        console.log(`----------------------------`)
        console.log(`Your Health: ${health}`)
        console.log(`----------------------------`)
        console.log(`${enemy.trim()}'s Health: ${enemyHealth}`)
        console.log(`----------------------------`)
        const { choice } = await inquirer.prompt([{
            name: 'choice',
            message: 'What would you like to do ?',
            type: 'rawlist',
            choices: ['Attack', 'Drink Health Potion', 'Run']
        }])
        if (choice === 'Attack') {
            let damageDealt = Math.ceil(Math.random() * attackDamage)
            let damageTaken = Math.ceil(Math.random() * enemyAttackDamage)

            health -= damageTaken
            enemyHealth -= damageDealt

            await attackAnimation(enemy)

            console.log(`>>> You strike the ${enemy.trim()} for ${damageDealt} damage`)
            console.log(`>>> ${enemy.trim()} damaged you for ${damageTaken}`)
            if (health < 1) {
                break
            }
        }
        else if (choice === 'Drink Health Potion') {
            if (totalHealthPotions > 0) {
                await sleep()
                totalHealthPotions--
                health += healthPotionHealAmount
                console.log(`>>> You drink a health potion, healing yourself for ${healthPotionHealAmount}`)
                console.log(`>>> You now have ${health} Health`)
                console.log(`>>> You have ${totalHealthPotions} health potion left`)
            }
            else {
                console.log(`>>> You have 0 health potion. Defeat enemies to get a chance for one`)
            }
        }
        else {
            console.log(`>>> You run away from the ${enemy.trim()}`)
            isRunAway = true
            break;
        }
        console.log(`\n`)
    }

    if (isRunAway) {
        isRunAway = false
        continue
    }
    if (health < 1 && enemyHealth < 1) {
        console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
        console.log(`  ${enemy.trim()} dropped BOMB, You Both were killed`)
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
        break
    }
    if (health < 1) {
        console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
        console.log(`  You were defeated by the ${enemy.trim()}`)
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
        break;
    }

    console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
    console.log(`  ${enemy.trim()} was defeated !!!`)
    console.log(`  You have ${health} Health left `)

    if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
        totalHealthPotions++
        console.log(`  The ${enemy.trim()} dropped a health potion `)
        console.log(`  You now have ${totalHealthPotions} health potions`)
    }
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)

    const { choice } = await inquirer.prompt([{
        name: 'choice',
        message: 'what would you like to do?',
        type: 'rawlist',
        choices: ['Continue Fighting', 'Exit']
    }])
    if (choice === 'Continue Fighting') {
        continue
    }
    break
}

console.log(`\n============================================================`)
console.log(`                 Thanks For Playing !!!!!!!                 `)
console.log(`============================================================`)
