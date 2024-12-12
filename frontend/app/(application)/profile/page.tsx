"use client";
import UserProfileHeader from "./_components/UserProfileHeader";
import PersonalInformation from "./_components/PersonalInformation";
import EmergencyContact from "./_components/EmergencyContact";

function UserProfile() {
  return (
    <div className="container px-12">
      <UserProfileHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PersonalInformation />
        <EmergencyContact />
      </div>
    </div>
  );
}

export default UserProfile;
{
  /* <div className="grid gap-6 pb-6 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Training Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {user.totalTrainingHours}
              </div>
              <p className="text-sm text-muted-foreground">
                Total training hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Competitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {user.competitionsParticipated}
              </div>
              <p className="text-sm text-muted-foreground">
                Competitions participated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Medals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {user.medalsWon.gold}
                  </div>
                  <p className="text-sm text-muted-foreground">Gold</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {user.medalsWon.silver}
                  </div>
                  <p className="text-sm text-muted-foreground">Silver</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-700">
                    {user.medalsWon.bronze}
                  </div>
                  <p className="text-sm text-muted-foreground">Bronze</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */
  /*
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="w-5 h-5 mr-2" />
              Grappling Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Competition Record</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">BJJ</p>
                    <p>
                      Wins: {user.competitionRecord.bjj.wins} / Losses:{" "}
                      {user.competitionRecord.bjj.losses}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wrestling</p>
                    <p>
                      Wins: {user.competitionRecord.wrestling.wins} / Losses:{" "}
                      {user.competitionRecord.wrestling.losses}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Upcoming Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.upcomingCompetitions.length > 0 ? (
              <ul className="space-y-2">
                {user.upcomingCompetitions.map((competition, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{competition.name}</span>
                    <Badge variant="outline">{competition.date}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming competitions scheduled.</p>
            )}
            <Dialog
              open={isCompetitionModalOpen}
              onOpenChange={setIsCompetitionModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full mt-4">
                  <Medal className="w-4 h-4 mr-2" />
                  Register for Competition
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Register for Competition</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="competitionName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="competitionName"
                      name="name"
                      value={newCompetition.name}
                      onChange={handleCompetitionInputChange}
                      divClassName="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="competitionDate" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="competitionDate"
                      name="date"
                      type="date"
                      value={newCompetition.date}
                      onChange={handleCompetitionInputChange}
                      divClassName="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleCompetitionSave}>Register</Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card> */
}
