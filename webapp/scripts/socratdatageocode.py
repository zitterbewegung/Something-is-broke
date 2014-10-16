from geopy import geocoders
import csv
reader = csv.reader(open("samples/sample.csv"))

for STREETNAME,DIRECTION,FROMDIRECTION\#,TODIRECTION\#,STREETSUFFIX,STARTDATE,ENDDATE,CLOSURETYPE in reader:
    reader = csv.reader(open(argv[0]))
    g = geocoders.Google()
    togeocode  = ""
    togeocode.join(STREETNAME)
    togeocode.join(STREETSUFFIX)
    togeocode.join(DIRECTION)
    
    place, (lat, lng) = g.geocode(togeocode)  
    print "%s: %.5f, %.5f" % (place, lat, lng) 
